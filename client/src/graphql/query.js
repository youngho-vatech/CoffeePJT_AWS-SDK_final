import gql from 'graphql-tag';

//User Order 목록 불러오기/검색
export const UserSearchQuery = gql`
    query {
        allUsers{
            _id, position,username, status
        }
    }
`;


//내 목록 불러오기
export const MeQuery = gql`
    query me($userid:String!) {
        me(userid:$userid){
            username
            position
            status
        }
    }

`


//명수 계산
export const CountQuery = gql`
    query howmany{
        howmany
    }

`

//누적 금액 계산
export const CostQuery = gql`
    query
    {
        howmuch
    }

`

//누적 잔 수
export const CupQuery = gql`
    query{coffeeAmount}`


//TASK QUERY


export const TaskQuery = gql`
    query{
        tasks{
            _id
            title
            creater
        }
    }


`

//Search

export const SearchQuery = gql`
    query($word: String!) {
        user(word:$word category:1){
            _id
            username
            status
            position
        }
    }

`


//주문자 Search

export const USearchQuery = gql`
    query($word: String!) {
        user(word:$word category:2){
            _id
            username
            status
            position
        }
    }

`


//모든 유저 불러오기
export const AllUserQuery = gql`
    query{
        allUsers{
            _id
            username
            position
            status
        }
    }
`

export const VacationQuery = gql`
    query{
        includedVacation{
            username
            _id
        }
    }

`

//Order Query

export const OrderQuery = gql`
    query {
        orders{
            username
            menu}
    }
`


export const NotQuery = gql`
    query {
        includedNothing{
            username
        }
    }


`

export const Ordermen = gql`
    query{
        includedOrdermen{
            username
            _id
        }
    }`


export const OrderSearch = gql`
    query orderMine($id:String!){
        orderMine(_id:$id){
            _id
            username
            hi
            menu
        }
    }
`

export const Receipt = gql`
    query {receipt}
`

export const ReceiptUser = gql`
    query receiptUser($menu:Int!)
    {receiptUser(cmenu:$menu)}
`




