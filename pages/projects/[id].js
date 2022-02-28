import client from '../../client';

const Project = ({project}) => {
  return (
    <div className="flex items-center justify-center p-10">
      <div className="flex flex-col items-center max-w-5xl">
        <div className="flex-row pb-10 flex items-start">
          <div className="flex-grow">
            <h1 className="text-6xl font-bold">{project?.projectId.current}</h1>
            <h2 className="text-2xl font-bold pt-4">{project?.type}</h2>
            <h3 className="text-xl">{project?.location}</h3>
            <p className="text-base text-gray-500">{project?.sublocation}</p>
            <h4 className="pt-4 font-bold">Assessment</h4>
            <p>{project?.description || "None"}</p>
            <h4 className="pt-4 font-bold">Notes</h4>
            <p>{project?.notes || "None"}</p>
          </div>
          <img className="w-3/4 pl-10" src={project?.map} />
        </div>
        <div className="w-3/4 self-end">
          <div className="text-lg mb-4 border-b border-gray-300 ml-10">SOLUTIONS</div>
          {project?.solutions?.map((solution)=>(
            <div className="odd:bg-gray-100 p-4 ml-6" key={solution._id}>
              <h4 className="text-xs">{solution.type}</h4>
              <div className="flex">
                <div className="flex-grow">
                  <h4 className="font-bold">{solution.estimated ? `Estimated cost (as of ${solution.estimated})` : 'Projected Cost'}</h4>
                  <h2 className="text-4xl font-bold">{solution.cost ? "$"+Intl.NumberFormat("en-US").format(solution.cost) : 'Unknown Cost'}</h2>
                  {solution.description
                  &&<div className="italic text-xs pb-4">
                      {solution.description}
                    </div>
                  }
                </div>
                { solution.work 
                ? <div className="text-sm pr-10">
                    <h4 className="font-bold">
                      Project Details
                    </h4>
                    <div className="pl-3">
                      {solution.work.map((work)=>(<p key={work}>↳{work}</p>))}
                    </div>
                  </div>
                : <h4 className="text-sm pr-10 font-bold text-gray-500">
                    Project Details Unknown
                  </h4>
                }
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
export async function getStaticPaths() {
  const paths = await client.fetch(
    `*[_type == "project"][].projectId.current`
  )
  console.log("PATHS:", paths)
  return {
    paths: paths.map((id) => ({params: {id}})),
    fallback: true,
  }
}

export async function getStaticProps(context) {
  // It's important to default the slug so that it doesn't return "undefined"
  const { id = "" } = context.params
  console.log("ID:", id.toUpperCase())
  const project = await client.fetch(`*[_type == "project" && projectId.current == "${id.toUpperCase()}"][0]{projectId,"map":map.asset->url,location,sublocation,type,description,notes,solutions}`)
  console.log("PROJECT", project)
  return {
    props: {
      project
    }
  }
}

export default Project