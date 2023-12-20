<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use HasFactory;
    protected $fillable=[
        'name','status','description','start_date','end_date','priority','category_id'
    ];

    public function category() {
        return $this->belongsTo(Category::class);
    }

    public function tasks() {
        return $this->hasMany(Task::class);
    }
}
