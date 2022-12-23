<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\VehicleRequest;
use App\Http\Resources\FailResponse;
use App\Http\Resources\PaginationResponse;
use App\Http\Resources\ShowResponse;
use App\Http\Resources\SuccessResponse;
use App\Http\Resources\VehicleAdminResource;
use App\Models\Vehicle;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class VehiclesController extends Controller
{
    private Model $model;
    public function __construct()
    {
        $this->middleware('jwt');
        $this->model = new Vehicle();
    }

    /**
     * @OA\Get (
     *     path="/admin/vehicles",
     *     summary="VehiclesController",
     *     @OA\Response(response="200", description="Response with success"),
     *     @OA\Response(response="500", description="Response with error"),
     *     tags={"Admin - Vehicles"},
     *     security={{ "jwt": {} }},

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

        return (new PaginationResponse($this->model->pagination($page, $limite, $search, 'id', null, null, null, null, Vehicle::ADMIN)))
            ->response()
            ->setStatusCode(200);
    }

    /**
     * @OA\Get (
     *     path="/admin/vehicles/{id}",
     *     summary="VehiclesController",
     *     @OA\Response(response="200", description="Response with success"),
     *     @OA\Response(response="404", description="Response with error - not found"),
     *     @OA\Response(response="500", description="Response with error"),
     *     tags={"Admin - Vehicles"},
     *     security={{ "jwt": {} }},
     *
     *     @OA\Parameter(
     *          name="id",
     *          in="path",
     *          required=true,
     *          description="vehicle ID",
     *          @OA\Schema(
     *              type="string"
     *          ),
     *     ),
     *    )
     *
     * @param Vehicle $vehicle
     * @return JsonResponse
     */
    public function show(Vehicle $vehicle): JsonResponse
    {
        return (new ShowResponse(['data' => VehicleAdminResource::make($vehicle->load(['Brand', 'Model']))]))
            ->response()
            ->setStatusCode(200);
    }

    /**
     * @OA\Post (
     *     path="/admin/vehicles",
     *     summary="VehiclesController",
     *     @OA\Response(response="200", description="Response with success"),
     *     @OA\Response(response="400", description="Response with error"),
     *     @OA\Response(response="500", description="Response with error"),
     *     tags={"Admin - Vehicles"},
     *     security={{ "jwt": {} }},
     *
     *     @OA\RequestBody(
     *          required=true,
     *          @OA\MediaType(
     *              mediaType="multipart/form-data",
     *              @OA\Schema(
     *                  type="object",
     *                  required={"name", "brand_id", "model_id", "photo", "price"},
     *                  @OA\Property(property="name", type="string" , example="name"),
     *                  @OA\Property(property="description", type="string" , example="name"),
     *                  @OA\Property(property="brand_id", type="integer" , example="1"),
     *                  @OA\Property(property="model_id", type="integer" , example="1"),
     *                  @OA\Property(property="photo", type="string", format="binary"),
     *                  @OA\Property(property="price", type="float" , example="10.5"),
     *              )
     *          )
     *      )
     *
     *    )
     *
     *
     * @param VehicleRequest $request
     * @return JsonResponse
     */
    public function store(VehicleRequest $request): JsonResponse
    {
        if ($status = $this->model->saveNewVehicle($request->validated(), $request->file('photo'))) {
            return (new SuccessResponse($status))
                ->response()
                ->setStatusCode(200);
        }
        return (new FailResponse(false))
            ->response()
            ->setStatusCode(400);
    }

    /**
     * @OA\Post (
     *     path="/admin/vehicles/{id}",
     *     summary="VehiclesController",
     *     @OA\Response(response="200", description="Response with success"),
     *     @OA\Response(response="400", description="Response with error"),
     *     @OA\Response(response="404", description="Response with error"),
     *     @OA\Response(response="500", description="Response with error"),
     *     tags={"Admin - Vehicles"},
     *     security={{ "jwt": {} }},
     *
     *     @OA\RequestBody(
     *          required=true,
     *          @OA\MediaType(
     *              mediaType="multipart/form-data",
     *              @OA\Schema(
     *                  type="object",
     *                  required={"_method", "name", "brand_id", "model_id", "price"},
     *                  @OA\Property(property="_method", type="string" , example="PUT"),
     *                  @OA\Property(property="name", type="string" , example="name"),
     *                  @OA\Property(property="description", type="string" , example="description"),
     *                  @OA\Property(property="brand_id", type="integer" , example="1"),
     *                  @OA\Property(property="model_id", type="integer" , example="1"),
     *                  @OA\Property(property="price", type="float" , example="10.5"),
     *                  @OA\Property(property="photo", type="string", format="binary"),
     *              )
     *          ),
     *      ),
     *      @OA\Parameter(
     *          name="id",
     *          in="path",
     *          required=true,
     *          description="vehicle ID",
     *          @OA\Schema(
     *              type="string"
     *          ),
     *     ),
     *    )
     * @param VehicleRequest $request
     * @param Vehicle $vehicle
     * @return JsonResponse
     */
    public function update(VehicleRequest $request, Vehicle $vehicle): JsonResponse
    {
        if ($status = $vehicle->updateVehicle($vehicle, $request->validated(), $request->file('photo'))) {
            return (new SuccessResponse($status))
                ->response()
                ->setStatusCode(200);
        }
        return (new FailResponse($status))
            ->response()
            ->setStatusCode(400);
    }

    /**
     * @OA\Delete (
     *     path="/admin/vehicles/{id}",
     *     summary="VehiclesController",
     *     @OA\Response(response="200", description="Response with success"),
     *     @OA\Response(response="400", description="Response with error"),
     *     @OA\Response(response="404", description="Response with error"),
     *     tags={"Admin - Vehicles"},
     *     security={{ "jwt": {} }},
     *
     *     @OA\Parameter(
     *          name="id",
     *          in="path",
     *          required=true,
     *          description="vehicle ID",
     *          @OA\Schema(
     *              type="string"
     *          ),
     *     ),
     *    )
     * @param Vehicle $vehicle
     * @return JsonResponse
     */
    public function destroy(Vehicle $vehicle): JsonResponse
    {
        if ($status = $vehicle->deleteVehicle()) {
            return (new SuccessResponse($status))
                ->response()
                ->setStatusCode(200);
        }
        return (new FailResponse($status))
            ->response()
            ->setStatusCode(400);
    }

}
