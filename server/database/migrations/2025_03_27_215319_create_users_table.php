<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('user', function (Blueprint $table) {
            $table->id('id_u');
            $table->string('username_u', 100)->unique();
            $table->string('profilpic_u')->nullable();
            $table->date('birthday_u')->nullable();
            $table->string('password_u');
            $table->string('email', 50)->unique();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('user');
    }
};