<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Resources\FailResponse;
use App\Http\Resources\SuccessResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function __construct()
    {
        $this->middleware('jwt')
            ->only('logout');
    }

    /**
     * @OA\Post (
     *     path="/auth/login",
     *     summary="PostController",
     *     @OA\Response(response="200", description="Response with success"),
     *     @OA\Response(response="400", description="Response with error"),
     *     tags={"Auth"},
     *
     *     @OA\RequestBody(
     *          required=true,
     *          @OA\MediaType(
     *              mediaType="application/x-www-form-urlencoded",
     *              @OA\Schema(
     *                  type="object",
     *                  required={"email", "password"},
     *                  @OA\Property(property="email", type="string" , example="admin@email.com"),
     *                  @OA\Property(property="password", type="string" , example="12345"),
     *              )
     *          )
     *      )
     *    )
     *
     * @param LoginRequest $request
     * @return JsonResponse
     */
    public function login(LoginRequest $request): JsonResponse
    {
        if ($token = auth()->guard('api')->attempt($request->only('email', 'password'))){
            return response()->json(auth()->user()->responseWithToken($token), 200);
        }
        return (new FailResponse(['message' => 'Credenciais inválidas!']))
            ->response()
            ->setStatusCode(401);
    }
    /**
     * @OA\Post (
     *     path="/auth/logout",
     *     summary="PostController",
     *     @OA\Response(response="200", description="Response with success"),
     *     tags={"Auth"},
     *     security={{ "jwt": {} }}
     *    )
     *
     * @return JsonResponse
     */
    public function logout(): JsonResponse
    {
        auth()->logout();
        return (new SuccessResponse(true))
            ->response();
    }
}
