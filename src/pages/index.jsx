import Layout from "../components/Layout";

export default function HomePage() {
  const dummy = [
    "https://images.unsplash.com/photo-1662421740070-f69fe90a987c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
    "https://images.unsplash.com/photo-1662530787378-966cc9f87a8d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=869&q=80",
    "https://images.unsplash.com/photo-1662581871625-7dbd3ac1ca18?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=386&q=80",
    "https://images.unsplash.com/photo-1657664066042-c59e5f84b7a8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
    "https://images.unsplash.com/photo-1662522195455-956b870bad32?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyMnx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60",
    "https://images.unsplash.com/photo-1662553068661-a8ec99fb1467?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyM3x8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60",
    "https://images.unsplash.com/photo-1657664049378-c8aadfe323f1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60",
  ];
  return (
    <Layout>
      <div className="columns-1 md:columns-2 lg:columns-3 w-full pb-12 space-y-4 px-3 border-black py-8">
        {dummy.map((el) => (
          <div className="overflow-hidden rounded group relative w-full h-auto">
            <img
              src={el}
              className="w-full group-hover:scale-110 duration-300"
            />
            <span className="absolute top-0 w-full group-hover:bg-slate-600 group-hover:bg-opacity-30 h-full duration-300"></span>
          </div>
        ))}
      </div>
    </Layout>
  );
}
