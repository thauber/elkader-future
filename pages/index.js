import client from '../client';
import {abbreviateNumber, toReadableMoney} from '../utils/numbers';
import Link from 'next/link'

export default function Home({projects}) {

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-xl py-4">Future Capital Projects</h1>
      {projects.map((project)=> {
        const highestCostSolution = project?.solutions?.reduce((maxCost,solution)=>Math.max(maxCost, solution.cost||0), 0)
        return (<Link key={project.projectId} href={`/projects/${project.projectId.current}`}>
          <a className="hover:bg-gray-300 flex m-4 w-full max-w-2xl bg-gray-100">
            <div className="relative">
              <img height="168" width="256" className="h-full max-w-2xs" src={project.map} alt={`${project.projectId.current} map`}/>
              <div className="absolute bottom-0 left-0 right-0 text-white bg-black/40 text-6xl p-4 h-full flex items-end">
                <p>{highestCostSolution ? '$'+abbreviateNumber(highestCostSolution, 2) : "Unprojected"}</p>
              </div>
            </div>
            <div className="p-4 pl-8 w-full flex-grow flex flex-col justify-center">
              <h1 className="text-6xl font-bold">{project?.projectId.current}</h1>
              <h2 className="text-2xl font-bold pt-4">{project?.type}</h2>
              <h3 className="text-xl">{project?.location} <span className="text-base text-gray-500">{project?.sublocation}</span> </h3>
            </div>
          </a>
        </Link>)
      })}
    </div>
  )
}



export async function getStaticProps(context) {
  // It's important to default the slug so that it doesn't return "undefined"
  const projects = await client.fetch(`*[_type == "project"]{projectId,"map":map.asset->url,location,sublocation,type,solutions}`)
  return {
    props: {
      projects
    }
  }
}
