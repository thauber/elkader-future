import client from '../client';

export default function Home({projects}) {

  return (
    <div className="flex flex-col items-center justify-center">
      {projects.map((project)=> (
        <a href={`/projects/${project.projectId.current}`} className="hover:bg-gray-300 flex m-4 w-full max-w-2xl bg-gray-100">
            <img className="max-w-xs" src={project.map} />
            <div className="p-4 pl-8 w-full flex-grow flex flex-col justify-center">
              <h1 className="text-6xl font-bold">{project?.projectId.current}</h1>
              <h2 className="text-2xl font-bold pt-4">{project?.type}</h2>
              <h3 className="text-xl">{project?.location} <span className="text-base text-gray-500">{project?.sublocation}</span> </h3>
            </div>
        </a>
      ))}
    </div>
  )
}



export async function getStaticProps(context) {
  // It's important to default the slug so that it doesn't return "undefined"
  const projects = await client.fetch(`*[_type == "project"]{projectId,"map":map.asset->url,location,sublocation,type}`)
  return {
    props: {
      projects
    }
  }
}