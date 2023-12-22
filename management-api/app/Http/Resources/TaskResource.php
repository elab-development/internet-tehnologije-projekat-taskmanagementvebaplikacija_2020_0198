<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TaskResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */

    public static $wrap='tasks';

    public function toArray(Request $request)
    {
        
        return [
            'id'=>$this->resource->id,
            'name'=>$this->resource->name,
            'status'=>$this->resource->status,
            'description'=>$this->resource->description,
            'project'=> new ProjectResource($this->resource->project),
            //'user_id'=>$this->resource->user_id
            'user'=>new UserResource($this->resource->user)
        ];


    }

    /*public static function collection($resource)  {
        return parent::collection($resource)->withoutWrapping();
    }*/
}
