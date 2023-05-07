<?php

use App\Http\Controllers\IngredientsController;
use App\Http\Controllers\Recipe;
use App\Http\Controllers\RecipeController;
use App\Http\Controllers\Recipename;
use App\Http\Controllers\RecipenameController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::apiResource('/recipes', RecipeController::class);
Route::apiResource('/recipename', RecipenameController::class);
Route::apiResource('/recipeingredient', IngredientsController::class);

