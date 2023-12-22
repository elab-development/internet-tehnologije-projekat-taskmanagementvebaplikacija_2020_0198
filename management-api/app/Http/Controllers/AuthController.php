<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function register(Request $request) {
        $validator=Validator::make($request->all(),[
            
            'username'=>'required|string|alpha_dash|max:255',
            'email'=>'required|string|max:255|email|unique:users',
            'password'=>'required|string|min:9',
            'password_confirmation' => 'required|string|same:password',
            'firstname'=>'required|string|max:255',
            'lastname'=>'required|string|max:255',
            'position'=>'required|string'
            

        ]);
    
        if($validator->fails())
           return response()->json($validator->errors());

        //kreiramo usera sa ovim atributima i cuvamo u bazu i prom
        $user=User::create([
            'username'=>$request->username,
            'email'=>$request->email,
            'password'=>Hash::make($request->password),
            'firstname'=>$request->firstname,
            'lastname'=>$request->lastname,
            'position'=>$request->position,
            
        ]);

        
        $token=$user->createToken('auth_token')->plainTextToken;

        return response()->json(['User'=>$user,'access_token'=>$token,'token_type'=>'Bearer']);
    }

    public function login(Request $request){
         
        if(!Auth::attempt($request->only('username','email','password')))
            return response()->json(['Message'=>'unauthorized'],401);


        
        $user=User::where('username',$request['username'])->first();

        $token=$user->createToken('auth_token')->plainTextToken;

        return response()->json(['message'=>'Welcome '.$user->firstname,'access_token'=>$token,'token_type'=>'Bearer']);
    }

    /*public function logout() {
        $user = auth()->user();
    
        if ($user) {
            $user->tokens->each(function ($token, $key) {
                $token->delete();
            });
    
            return [
                'message' => 'You have logged out'
            ];
        } else {
            return response()->json(['message' => 'User not authenticated'], 401);
        }
    }*/
    
    /*public function logout(){
        auth()->user()->token->delete();
        return  [
            'message'=>'You have logged out'
        ];

    }*/
    
    
}
