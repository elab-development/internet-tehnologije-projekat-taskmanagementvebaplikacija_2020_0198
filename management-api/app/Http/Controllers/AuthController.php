<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [

            'username' => 'required|string|alpha_dash|max:255',
            'email' => 'required|string|max:255|email|unique:users',
            'password' => 'required|string|min:9',
            'password_confirmation' => 'required|string|same:password',
            'firstname' => 'required|string|max:255',
            'lastname' => 'required|string|max:255',
            'position' => 'required|string'


        ]);

        if ($validator->fails())
            return response()->json($validator->errors());

        //kreiramo usera sa ovim atributima i cuvamo u bazu i prom
        $user = User::create([
            'username' => $request->username,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'firstname' => $request->firstname,
            'lastname' => $request->lastname,
            'position' => $request->position,

        ]);


        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json(['user' => new UserResource($user), 'access_token' => $token, 'token_type' => 'Bearer']);
    }

    public function login(Request $request)
    {

        if (!Auth::attempt($request->only('email', 'password')))
            return response()->json(['message' => 'unauthorized'], 401);



        $user = User::where('email', $request->email)->first();

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json(['message' => 'Welcome ' . $user->firstname, 'access_token' => $token, 'token_type' => 'Bearer', 'user' => new UserResource($user)]);
    }




    public function logout(Request $request)
    {
        auth()->user()->tokens()->delete();

        return  [
            'message' => 'You have logged out'
        ];
    }

    public function forgotpassword(Request $request)
    {
        /*if(Auth::attempt($request->only('email')))
            return response()->json(['Message'=>'Does not exist user with this email!'],401);*/

        $request->validate(['email' => 'required|email']);


        $user = User::where('email', $request['email'])->first();

        if (is_null($user)) {
            return response()->json('User is not found', 404);
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        //$token=$user->getToken();

        return response()->json(['message' => 'Mail:  ' . $user->email, 'access_token' => $token, 'token_type' => 'Bearer']);
    }


    public function resetpassword(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required|string|min:9',
            'password_confirmation' => 'required|string|same:password',
        ]);

        if ($validator->fails())
            return response()->json($validator->errors());

        $user = User::where('email', $request->email)->first();

        $user->password = Hash::make($request->password);

        $user->save();
        return response()->json(['message' => 'Password changed successfully:  ' . $user->email]);
    }
}
