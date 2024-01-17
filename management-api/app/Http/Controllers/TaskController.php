<?php

namespace App\Http\Controllers;

use App\Http\Resources\TaskResource;
use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $tasks = Task::all();
        // $tasks = Task::paginate(3);
        // return response()->json($tasks);
        return response()->json(TaskResource::collection($tasks));
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
        $validator = Validator::make($data, [
            'name' => 'required',
            'status' => 'required',
            'description' => 'required',
            'project_id' => 'required',
            'user_id' => 'required'

        ], [
            'name.required' => 'Please give task name',
            'status.required' => 'Please give task status',
            'description.required' => 'Please give task description',
            'project_id.required' => 'Please give project_id',
            'user_id.required' => 'Please give user_id'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => $validator->getMessageBag()->first(),
            ]);
        }

        $task = new Task();
        $task->name = $request->name;
        $task->status = $request->status;
        $task->description = $request->description;
        $task->project_id = $request->project_id;
        $task->user_id = $request->user_id;



        $task->save();

        return response()->json([
            'success' => true,
            'message' => 'Task saved',
            'task' => $task
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {

        $task = Task::find($id);
        if (is_null($task)) {
            return response()->json('Task not found', 404);
        }
        return response()->json(new TaskResource($task));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Task $task)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string',
            'status' => 'required|in:0,1',
            'description' => 'required|string|max:255',
            'project_id' => 'required',
            'user_id' => 'required'

        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => $validator->errors()
            ]);
        }

        $task = Task::find($id);
        $task->name = $request->name;
        $task->status = $request->status;
        $task->description = $request->description;
        $task->project_id = $request->project_id;
        $task->user_id = $request->user_id;

        $task->save();

        return response()->json([
            'success' => true,
            'message' => 'Task updated successfully',
            'data' => $task
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $task = Task::find($id);

        if (is_null($task)) {
            return response()->json('Task not found', 404);
        }


        if ($task->delete()) {
            return response()->json([
                'success' => true,
                'message' => 'Task deleted successfully',

            ]);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'Failed to delete Task',
            ], 500); // 500 označava Internal Server Error
        }
    }

    public function filterByStatus($status)
    {
        $filteredTasks = Task::where('status', $status)->paginate(3); // Filtriranje po statusu i paginacija

        return response()->json($filteredTasks);
    }
}
