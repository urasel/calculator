<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class CalculationController extends Controller
{
    public function index()
    {
        //
    }

    public function process(Request $request)
    {
        $operandOne = $request->operandOne;
        $operandTwo = $request->operandTwo;
        $operatorSymbol = $request->operatorSymbol;
        
        if(empty($operandOne) || empty($operandTwo || empty($operatorSymbol)))
        {
            return response()->json([
                'status'=> false,
                'message'=>'Please fillup all the Fields!',
            ]);
        }
        else
        {
            $result = null;
            if (is_numeric($operandOne) && is_numeric($operandTwo)) {
                switch ($operatorSymbol) {
                    case "Add":
                       $result = $operandOne + $operandTwo;
                        break;
                    case "Subtract":
                       $result = $operandOne - $operandTwo;
                        break;
                    case "Multiply":
                        $result = $operandOne * $operandTwo;
                        break;
                    case "Divide":
                        $result = $operandOne / $operandTwo;
                }
                return response()->json([
                    'status'=> 200,
                    'result' => $result,
                    'message'=>'Calculation done Successfully',
                ]);

            }else{
                return response()->json([
                    'status'=> 400,
                    'result' => 0,
                    'message'=>'Error In Calcualtion',
                ]);
            }

            
        }

    }

}
