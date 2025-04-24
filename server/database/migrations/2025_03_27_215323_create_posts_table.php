<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('post', function (Blueprint $table) {
            $table->id('id_p');
            $table->string('title_p');
            $table->text('discription_p')->nullable();
            $table->string('pic_p')->nullable();
            $table->enum('statu_p', ['public', 'private', 'archived']);
            $table->unsignedBigInteger('id_u');
            $table->integer('total_rating')->default(0);
            $table->integer('rating_count')->default(0);
            $table->decimal('average_rating', 3, 2)->default(0);
            $table->timestamps();

            $table->foreign('id_u')->references('id_u')->on('user')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('post');
    }
};