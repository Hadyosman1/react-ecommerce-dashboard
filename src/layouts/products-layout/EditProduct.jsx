import PageHeader from "../../atoms/PageHeader"

const EditProduct = () => {
  return (
    <section className="flex flex-col gap-6">
      <PageHeader redirectTo={"/dashboard/products"}  title={"Edit Product"}/>
    </section>
  )
}

export default EditProduct