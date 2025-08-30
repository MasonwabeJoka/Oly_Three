const Page = ({searchParams} : {searchParams: any}) => {
  return (
    <div>{searchParams.param}</div>
  )
}

export default Page