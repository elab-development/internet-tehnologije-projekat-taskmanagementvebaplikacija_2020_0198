<?php

namespace App\Http\Controllers;

use App\Http\Resources\TaskResource;
use App\Models\Project;
use App\Models\Task;
use Illuminate\Http\Request;

class ProjectTaskController extends Controller
{
    public function index($project_id) {
        //vraca sve task-ove za odredjeni projekat
        $tasks=Task::get()->where('project_id',$project_id);

        if($tasks->isEmpty()){
            return response()->json('Task not found',404);
        }
        return response()->json(TaskResource::collection($tasks));
        
    }

    

}
