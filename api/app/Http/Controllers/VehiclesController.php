<?php

namespace App\Http\Controllers;

use App\Http\Resources\PaginationResponse;
use App\Http\Resources\ShowResponse;
use App\Http\Resources\SuccessResponse;
use App\Models\Brand;
use App\Models\Vehicle;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class VehiclesController extends Controller
{
    private Model $model;
    public function __construct()
    {
        $this->middleware('jwt')
            ->only('show');
        $this->model = new Vehicle();
    }

    /**
     * @OA\Get (
     *     path="/public/vehicles",
     *     summary="VehiclesController",
     *     @OA\Response(response="200", description="Response with success"),
     *     @OA\Response(response="500", description="Response with error"),
     *     tags={"Public"},
     *
     *     @OA\Parameter(
     *          name="per_page",
     *          in="query",
     *          required=false,
     *          description="pagination - per page",
     *          @OA\Schema(
     *              type="integer"
     *          ),
     *     ),
     *     @OA\Parameter(
     *          name="page",
     *          in="query",
     *          required=false,
     *          description="pagination - page",
     *          @OA\Schema(
     *              type="integer"
     *          ),
     *     ),
     *     @OA\Parameter(
     *          name="search",
     *          in="query",
     *          required=false,
     *          description="filter - title or description",
     *          @OA\Schema(
     *              type="string"
     *          ),
     *     ),
     *     @OA\Parameter(
     *          name="startPrice",
     *          in="query",
     *          required=false,
     *          description="filter - price of vehicle",
     *          @OA\Schema(
     *              type="string"
     *          ),
     *     ),
     *     @OA\Parameter(
     *          name="endPrice",
     *          in="query",
     *          required=false,
     *          description="filter - price of vehicle",
     *          @OA\Schema(
     *              type="string"
     *          ),
     *     ),
     *     @OA\Parameter(
     *          name="brand_id",
     *          in="query",
     *          required=false,
     *          description="filter - brand id",
     *          @OA\Schema(
     *              type="string"
     *          ),
     *     ),
     *     @OA\Parameter(
     *          name="model_id",
     *          in="query",
     *          required=false,
     *          description="filter - model id",
     *          @OA\Schema(
     *              type="string"
     *          ),
     *     ),
     *    )
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function index(Request $request): JsonResponse
    {
        $limite = $request->get('per_page') ?? 10;
        $page   = $request->get('page') ?? 1;
        $search = $request->get('search') ?? "";
        $startPrice = $request->get('startPrice');
        $endPrice = $request->get('endPrice');
        $brandId = $request->get('brandId');
        $modelId = $request->get('modelId');

        return (new PaginationResponse($this->model->pagination($page, $limite, $search, $startPrice, $endPrice, $brandId, $modelId, Vehicle::PUBLIC)))
            ->response()
            ->setStatusCode(200);
    }

    /**
     * @OA\Get (
     *     path="/public/brands",
     *     summary="VehiclesController",
     *     @OA\Response(response="200", description="Response with success"),
     *     @OA\Response(response="500", description="Response with error"),
     *     tags={"Public"},
     *
     *    )
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function brands(Request $request): JsonResponse
    {
        return (new ShowResponse(['data' => Brand::getAll()]))
            ->response()
            ->setStatusCode(200);
    }

    /**
     * @OA\Get (
     *     path="/public/models",
     *     summary="VehiclesController",
     *     @OA\Response(response="200", description="Response with success"),
     *     @OA\Response(response="500", description="Response with error"),
     *     tags={"Public"},
     *
     *    )
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function models(Request $request): JsonResponse
    {
        return (new ShowResponse(['data' => \App\Models\Model::getAll()]))
            ->response()
            ->setStatusCode(200);
    }



}
