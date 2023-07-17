<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Task;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $user = Auth::user();
        $tasks = $user->tasks;
        return response()->json([
            'tasks' => $tasks
        ], 200);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // validate
        $request->validate([
            'title' => 'required|string',
            'description' => 'required|string',
            'status' => 'required|string'
        ]);

        // get Auth user
        $user = Auth::user();
        // create new task
        $task = new Task([
            'title' => $request->title,
            'description' => $request->description,
            'status' => $request->status,
            'user_id' => $user->id
        ]);

        // save task
        $task->save();

        // return response
        return response()->json([
            'task' => $task
        ], 200);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
        $user = Auth::user();

        $task = $user->tasks->find($id);

        if (!$task) {
            return response()->json([
                'message' => 'Task not found'
            ], 404);
        }

        return response()->json([
            'task' => $task
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //validate
        $request->validate([
            'title' => 'required|string',
            'description' => 'required|string',
            'status' => 'required|string'
        ]);
        // get Auth user
        $user = Auth::user();
        // get task and check if it exists
        $task = $user->tasks()->find($id);
        if (!$task) {
            return response()->json([
                'message' => 'Task not found'
            ], 404);
        }

        // update task
        $task->title = $request->title;
        $task->description = $request->description;
        $task->status = $request->status;

        // save task
        $task->save();

        // return response
        return response()->json([
            'task' => $task
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        // get Auth user
        $user = Auth::user();
        // get task and check if it exists
        $task = $user->tasks()->find($id);
        if (!$task) {
            return response()->json([
                'message' => 'Task not found'
            ], 404);
        }

        // delete task
        $task->delete();
        return response()->json([
            'message' => 'Task deleted successfully'
        ], 200);
    }
}
