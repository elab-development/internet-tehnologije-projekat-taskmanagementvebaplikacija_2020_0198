<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $users=User::all();

       // return $tasks;
       return  UserResource::collection($users);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        
     $roleOption=['Admin','VIP korisnik','Korisnik'];
     $data = $request->all();
     $validator=Validator::make($data,[
        'username'=>'required',
        'firstname'=>'required',
        'lastname'=>'required',
        //'position'=>'required',
        'email'=>'required',
        'password'=>'required',
        'role'=>['required', Rule::in($roleOption)],
     ],[
        'username.required'=>'Please give username',
        'firstname.required'=>'Please give user firstname',
        'lastname.required'=>'Please give user lastname',
        'email.required'=>'Please give user email',
        'password.required'=>'Please give password',
        'role.required'=>'Role:Admin, VIP korisnik, Korisnik'
     ]);

     if($validator->fails()){
        return response()->json([
            'success'=>false,
            'message'=>$validator->getMessageBag()->first(),
        ]);
     }

     $user = new User();
     $user->username=$request->username;
     $user->firstname=$request->firstname;
     $user->lastname=$request->lastname;
     $user->position=$request->position;
     $user->email=$request->email;
     $user->password=$request->password;
     $user->role=$request->role;

     $user->save();

     return response()->json([
        'success'=>true,
        'message'=>'User saved',
        'user'=> $user
    ]);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $user=User::find($id);
        if(is_null($user)){
            return response()->json('User not found',404);
        }
        return response()->json(new UserResource($user));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request,$id)
    {
        $roleOption=['Admin','VIP korisnik','Korisnik'];
        $validator=Validator::make($request->all(),[
            'username'=>'required|string',
            'firstname' => 'require|string',
            'lastname'=>'required|string',
            'position'=>'required|string',
            'email' => 'required|string|email',
            'password'=>'required|min:9',
            'role'=>['required', Rule::in($roleOption)],
            

        ]);

        if($validator->fails()){
            return response()->json([
                'success'=>false,
                'message'=>$validator->errors()
            ]);
        }

        $user=User::find($id);

        
        if(is_null($user)){
            return response()->json('User not found',404);
        }

        $user->username=$request->username;
        $user->firstname=$request->firstname;
        $user->lastname=$request->lastname;
        $user->position=$request->position;
        $user->email=$request->email;
        $user->password=$request->password;
        $user->role=$request->role;
        $user->save();

        return response()->json([
            'success'=>true,
            'message'=>'User updated successfully',
            'data'=> $user
        ]);

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {

        $user=User::find($id);

        if(is_null($user)){
            return response()->json('User not found',404);
        }


        if($user->delete()){
            return response()->json([
            'success'=>true,
            'message'=>'User deleted successfully',
            
           ]);
        }
        else{
            return response()->json([
                'success' => false,
                'message' => 'Failed to delete user',
            ], 500); // 500 označava Internal Server Error
        }
        

    }

    public function filterByRole($role)  {
        $filteredUser = User::where('role', $role)->paginate(2); 

        return response()->json($filteredUser);
    }
}
