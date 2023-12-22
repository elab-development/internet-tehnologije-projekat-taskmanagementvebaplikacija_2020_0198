<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProjectResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    
    //public static $wrap='project';
    
     public function toArray(Request $request)
    {
        return [
            'id'=>$this->resource->id,
            'name'=>$this->resource->name,
            'status'=>$this->resource->status,
            'description'=>$this->resource->description,
            'start_date'=> $this->resource->start_date,
            'end_date'=> $this->resource->end_date,
            'priority'=> $this->resource->priority,
            'category_id'=> $this->resource->category_id
        ];
    }
}
