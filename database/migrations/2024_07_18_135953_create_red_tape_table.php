<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('red_tapes', function (Blueprint $table) {
            $table->id();
            $table->tinyInteger('ips');
            $table->string('boss_name');
            $table->string('boss_phone');
            $table->string('reference_name');
            $table->string('reference_phone');
            $table->string('reference_relationship');
            $table->string('informconf');
            $table->string('work_certificate');
            $table->string('last_ips');
            $table->unsignedBigInteger('loan_id');
            $table->foreign('loan_id')->references('id')->on('loans')->onDelete('cascade');
            $table->unsignedBigInteger('user_id');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('red_tape');
    }
};
