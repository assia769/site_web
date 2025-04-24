<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('admine', function (Blueprint $table) {
            $table->id('id_a');
            $table->string('name_a', 100);
            $table->string('profpic_a')->nullable();
            $table->string('nationality_a', 50)->nullable();
            $table->date('birthday_a')->nullable();
            $table->string('username_a', 50)->unique();
            $table->string('password_a');
            $table->string('phonenumb_a', 20)->unique()->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('admine');
    }
};