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
        Schema::table('pays', function (Blueprint $table) {
            $table->string('operation_id')->after('amount')->nullable();
            $table->string('bank')->after('operation_id')->nullable();
            $table->date('pay_date')->after('bank')->nullable();
            $table->longText('vaucher')->after('pay_date')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        
    }
};
