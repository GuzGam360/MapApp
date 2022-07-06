import React from "react";
import { Table } from "reactstrap";
import './DestinationTable.css';

function DesinationTable() {


    return (
        <div>
            <Table size="sm" responsive>
                <thead>
                    <tr>
                        <th className="Numbers">Numero de Destino</th>
                        <th>Destino</th>
                        <th className="Time">Tiempo</th>
                    </tr>
                </thead>
                <tbody>
                    <tr> 
                        <th scope="row">1</th>
                    </tr>
                    <tr>
                        <th scope="row">2</th>
                    </tr>
                    <tr>
                        <th scope="row">3</th>
                    </tr>
                </tbody>
            </Table>
        </div>
    );
}

export default DesinationTable;