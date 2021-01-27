import React from "react";
import {CreateMutation} from "../../graphql/mutation";
import {useMutation} from "@apollo/react-hooks";
import {CostQuery, CountQuery, MeQuery, NotQuery, OrderSearch, Receipt} from "../../graphql/query";
import Button from "@material-ui/core/Button";

export function CreateOrder(hi) {

    const createmutation = CreateMutation;

    const [create] = useMutation(createmutation, {
            refetchQueries: [{query: OrderSearch, variables: {id: localStorage.getItem('myData')}}
                , {query: MeQuery, variables: {userid: localStorage.getItem('myData')}},
                {query: Receipt}, {query: CostQuery}, {query: CountQuery}, {query: NotQuery}],
            variables: {
                id: localStorage.getItem('myData'),
                menu: hi.menu,
                hi: hi.hi
            },
            onError: () => {
                alert("메뉴를 선택해주세요.")
            },
        }
    )

    return (
        <>
            <Button
                type='submit'
                color={hi.color}
                onClick={create}>
                {hi.label}
            </Button>
        </>


    )
}

export default CreateOrder;