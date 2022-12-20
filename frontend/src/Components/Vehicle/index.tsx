import { IVehicle } from "../../types/Public/context_vehicle"

type Props = {
    vehicle: IVehicle
}

export const VehicleCard: React.FC<Props> = ({ vehicle }) => {

    return (
        <>
            <tr>
                <td>{vehicle.token}</td>
                <td>{vehicle.name}</td>
            </tr>
        </>
    )
}