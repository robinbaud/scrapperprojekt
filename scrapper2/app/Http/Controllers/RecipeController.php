<?php

namespace App\Http\Controllers;

use App\Models\Ingredients;
use App\Models\Recipe;
use App\Models\Recipename;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class RecipeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $title = '';
        if($request->title){
            $title = $request->title;
        };
        $recipes = DB::table('recipenames')
        ->join('ingredients', 'recipenames.key', '=', 'ingredients.key')
        ->select('recipenames.title', 'ingredients.ingredients', 'ingredients.steps')
        ->where('recipenames.title', 'LIKE', '%'.$title.'%')
        ->get();
        foreach($recipes as $recipe){
            $recipe->ingredients = json_decode($recipe->ingredients);
            $recipe->steps = json_decode($recipe->steps);
        };

        return $recipes;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {


        $data = file_get_contents(__DIR__ . "/../data.json");
        $parseddata = json_decode($data);
        foreach($parseddata as $datum) {
            $unique = uniqid();

            $ingredients = isset($datum->Ingredients) ?json_encode($datum->Ingredients) : '';
            $title = isset($datum->Title) ? $datum->Title : '';


            $steps = isset($datum->Step) ? json_encode($datum->Step) : '';


            Recipename::create(['title' => $title, 'description' => '', 'key' => $unique]);
             Ingredients::create(['ingredients' => $ingredients, 'steps' => $steps, 'key' => $unique]);
        }
        return ("ok");
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Recipe $recipe)
    {
        return $recipe;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Recipe $recipe)
    {

        $recipe->update($request->all());
        return $recipe;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
