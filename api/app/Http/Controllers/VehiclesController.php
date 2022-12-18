<?php

namespace App\Http\Controllers;

use App\Http\Resources\PaginationResponse;
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

        return (new PaginationResponse($this->model->pagination($page, $limite, $search, Vehicle::PUBLIC)))
            ->response()
            ->setStatusCode(200);
    }

}
