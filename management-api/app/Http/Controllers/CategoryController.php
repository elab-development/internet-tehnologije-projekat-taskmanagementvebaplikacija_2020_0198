<?php

namespace App\Http\Controllers;

use App\Http\Resources\CategoryResource;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $categories=Category::all();

        // return $tasks;
        return  CategoryResource::collection($categories);
        //return response()->json(CategoryResource::collection($categories)); 
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
        $data = $request->all();
     $validator=Validator::make($data,[
        'name'=>'required',
     ],[
        'name.required'=>'Please give category name',
        
     ]);

     if($validator->fails()){
        return response()->json([
            'success'=>false,
            'message'=>$validator->getMessageBag()->first(),
        ]);
     }

     $category = new Category();
     $category->name=$request->name;
     
     $category->save();

     return response()->json([
        'success'=>true,
        'message'=>'Category saved',
        'data'=> $category
    ]);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $category=Category::find($id);
        if(is_null($category)){
            return response()->json('Category is not found',404);
        }
        return response()->json($category);

    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Category $category)
    {
        
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $validator=Validator::make($request->all(),[
            'name'=>'required|string',
        ]);

        if($validator->fails()){
            return response()->json([
                'success'=>false,
                'message'=>$validator->errors()
            ]);
        }

        $category=Category::find($id);
        $category->name=$request->name;
        
        $category->save();

        return response()->json([
            'success'=>true,
            'message'=>'Category updated successfully',
            'data'=> $category
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $category=Category::find($id);

        if(is_null($category)){
            return response()->json('Category not found',404);
        }


        if($category->delete()){
            return response()->json([
            'success'=>true,
            'message'=>'Category deleted successfully',
            
           ]);
        }
        else{
            return response()->json([
                'success' => false,
                'message' => 'Failed to delete category',
            ], 500); // 500 označava Internal Server Error
        }
    }
}
