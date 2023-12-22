<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class ProjectController extends Controller
{
    public function index()  {
        $projects=Project::all();

        return $projects;
    }

    public function show($id){
        $project=Project::find($id);
        if(is_null($project)){
            return response()->json('Project is not found',404);
        }
        return response()->json($project);
        
    }

   public function store(Request $request) {
    
    $priorityOptions=['low','medium','high'];
     $data = $request->all();
     $validator=Validator::make($data,[
        'name'=>'required',
        'status'=>'required',
        'description'=>'required',
        'start_date'=>'required',
        'priority'=>['required', Rule::in($priorityOptions)],
        'category_id'=>'required'
     ],[
        'name.required'=>'Please give project name',
        'status.required'=>'Please give project status',
        'description.required'=>'Please give project description',
        'priority.required'=>'Priority: low,medium,high'
     ]);

     if($validator->fails()){
        return response()->json([
            'success'=>false,
            'message'=>$validator->getMessageBag()->first(),
        ]);
     }

     $project = new Project();
     $project->name=$request->name;
     $project->status=$request->status;
     $project->description=$request->description;
     $project->start_date=$request->start_date;
     $project->end_date=$request->end_date;
     $project->priority=$request->priority;
     $project->category_id=$request->category_id;

     $project->save();

     return response()->json([
        'success'=>true,
        'message'=>'Project saved',
        'data'=> $project
    ]);

    }

    public function update(Request $request,$id) {
        
        $priorityOptions=['low','medium','high'];
        $validator=Validator::make($request->all(),[
            'name'=>'required|string',
            'status' => 'required|in:0,1',
            'description'=>'required|string|max:255',
            'start_date'=>'required',
            'end_date' => 'required|date|after:start_date',
            'priority'=> ['required', Rule::in($priorityOptions)],
            'category_id'=>'required'

        ]);

        if($validator->fails()){
            return response()->json([
                'success'=>false,
                'message'=>$validator->errors()
            ]);
        }

        $project=Project::find($id);
        $project->name=$request->name;
        $project->status=$request->status;
        $project->description=$request->description;
        $project->start_date=$request->start_date;
        $project->end_date=$request->end_date;
        $project->priority=$request->priority;
        $project->category_id=$request->category_id;

        $project->save();

        return response()->json([
            'success'=>true,
            'message'=>'Project updated successfully',
            'data'=> $project
        ]);

    
    }

    public function destroy($id){
        $project=Project::find($id);
        $project->delete();
        return response()->json([
            'success'=>true,
            'message'=>'Project deleted successfully',
            
        ]);

    }


}
