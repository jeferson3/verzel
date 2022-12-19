<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class VehicleRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'name'          => 'required',
            'description'   => 'required',
            'brand_id'      => 'required|exists:brands,id',
            'model_id'      => 'required|exists:models,id',
            'photo'         => 'required',
            'price'         => 'required',
        ];
    }


    /**
     * @param Validator $validator
     * @return array
     */
    protected function failedValidation(Validator $validator): array
    {
        $clientErrors = [];
        foreach ($validator->getMessageBag()->toArray() as $value) {
            $clientErrors[] = $value;
        }

        $response = response()->json([
            'status'  => false,
            'message' => 'Dados inválidos!',
            'errors'  => $clientErrors
        ], 400);

        throw new HttpResponseException($response);
    }

}
