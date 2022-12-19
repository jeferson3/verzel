import { IVehicle } from "../../types/context_vehicle"

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