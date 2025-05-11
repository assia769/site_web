<?php
// backend/database/migrations/2023_01_01_000001_create_database_tables.php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        // Table des utilisateurs
        Schema::create('users', function (Blueprint $table) {
            $table->id('id_u');
            $table->string('username_u', 100);
            $table->string('profilpic_u', 255)->nullable();
            $table->date('birthday_u')->nullable();
            $table->string('password_u', 255);
            $table->string('email', 50)->unique();
            $table->timestamps();
        });

        // Table des administrateurs
        Schema::create('admine', function (Blueprint $table) {
            $table->id('id_a');
            $table->string('name_a', 100);
            $table->string('profpic_a', 255)->nullable();
            $table->string('nationality_a', 50)->nullable();
            $table->date('birthday_a')->nullable();
            $table->string('username_a', 50)->unique();
            $table->string('password_a', 255);
            $table->string('phonenumb_a', 20)->unique()->nullable();
            $table->string('email', 50)->unique();
            $table->timestamps();
        });

        // Table des publications (posts)
        Schema::create('post', function (Blueprint $table) {
            $table->id('id_p');
            $table->string('title_p', 255);
            $table->text('discription_p')->nullable();
            $table->string('pic_p', 255)->nullable();
            $table->enum('statu_p', ['public', 'private', 'archived']);
            $table->unsignedBigInteger('id_u');
            $table->timestamp('date_p')->useCurrent();
            $table->integer('total_rating')->default(0);
            $table->integer('rating_count')->default(0);
            $table->decimal('average_rating', 3, 2)->default(0);
            $table->foreign('id_u')->references('id_u')->on('users')->onDelete('cascade');
        });

        // Table des commentaires
        Schema::create('comments', function (Blueprint $table) {
            $table->id('id_c');
            $table->unsignedBigInteger('id_u');
            $table->unsignedBigInteger('id_p');
            $table->timestamp('date_c')->useCurrent();
            $table->text('comment_c');
            $table->foreign('id_u')->references('id_u')->on('users')->onDelete('cascade');
            $table->foreign('id_p')->references('id_p')->on('post')->onDelete('cascade');
        });

        // Table des étoiles (likes/stars)
        Schema::create('stars', function (Blueprint $table) {
            $table->id('id_st');
            $table->unsignedBigInteger('id_u');
            $table->unsignedBigInteger('id_p');
            $table->integer('rating');
            $table->foreign('id_u')->references('id_u')->on('users')->onDelete('cascade');
            $table->foreign('id_p')->references('id_p')->on('post')->onDelete('cascade');
        });

        // Table des sauvegardes (posts enregistrés)
        Schema::create('save', function (Blueprint $table) {
            $table->id('id_s');
            $table->unsignedBigInteger('id_u');
            $table->unsignedBigInteger('id_p');
            $table->foreign('id_u')->references('id_u')->on('users')->onDelete('cascade');
            $table->foreign('id_p')->references('id_p')->on('post')->onDelete('cascade');
        });

        // Table des signalements (reports)
        Schema::create('report', function (Blueprint $table) {
            $table->id('id_r');
            $table->unsignedBigInteger('id_u');
            $table->unsignedBigInteger('id_p');
            $table->timestamp('date_r')->useCurrent();
            $table->text('description_r');
            $table->foreign('id_u')->references('id_u')->on('users')->onDelete('cascade');
            $table->foreign('id_p')->references('id_p')->on('post')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('report');
        Schema::dropIfExists('save');
        Schema::dropIfExists('stars');
        Schema::dropIfExists('comments');
        Schema::dropIfExists('post');
        Schema::dropIfExists('admine');
        Schema::dropIfExists('users');
    }
};