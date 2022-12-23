import "./style.css";
import {Menu} from "../../Components/Menu";
import {Container} from "react-bootstrap";
import {StatCard} from "../../Components/Admin/StatCard";
import {useAdminContext} from "../../Context/Admin/context";
import {useEffect, useRef} from "react";
import {getVehicles} from "../../Context/Admin/actions";
import {useVehicleContext} from "../../Context/Public/VehicleContext/context";
import {getBrands, getModels} from "../../Context/Public/VehicleContext/actions";

export const Admin = () => {

    const { state: { vehicles }, dispatch } = useAdminContext();
    const vehicleContext = useVehicleContext();
    const { state: { models, brands } } = vehicleContext;

        const isMounted = useRef(true);

    useEffect(function () {
        if (isMounted.current) {
            (
                async function () {
                    await Promise.all([
                        getVehicles(1, 10, dispatch),
                        getBrands(false, vehicleContext.dispatch),
                        getModels(false, vehicleContext.dispatch)
                    ])
                }
            )()
        }
        return () => {
            isMounted.current = false;
        }
    })

    return (
        <div>
            <Menu isLoginPage={false} isSitePage={false}/>
            <Container>
                <h3>Dashboard</h3>
                <hr/>
                <div className={'row'}>
                    <div className={'col-md-4'}>
                        <StatCard variant={'primary'} value={vehicles?.total ?? 0} title={'Veículos cadastrados'} icon={'fas fa-car'}/>
                    </div>
                    <div className={'col-md-4'}>
                        <StatCard variant={'danger'} value={brands.data.length ?? 0} title={'Modelos cadastrados'} icon={'fas fa-car-side'}/>
                    </div>
                    <div className={'col-md-4'}>
                        <StatCard variant={'success'} value={models.data.length ?? 0} title={'Marcas cadastradas'}
                                  icon={'fas fa-plus-square'}/>
                    </div>
                </div>
            </Container>
        </div>
    )
}