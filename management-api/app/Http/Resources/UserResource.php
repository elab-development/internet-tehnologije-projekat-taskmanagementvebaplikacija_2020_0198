<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */

    public static $wrap='user';
    public function toArray(Request $request)
    {
        return [
            'id'=>$this->resource->id,
            'username'=>$this->resource->username,
            'firstname'=>$this->resource->firstname,
            'lastname'=>$this->resource->lastname,
            'position'=>$this->resource->position,
            'email'=>$this->resource->email,
            'password'=> $this->resource->password,
            'role'=> $this->resource->role
        ];
    }
}
