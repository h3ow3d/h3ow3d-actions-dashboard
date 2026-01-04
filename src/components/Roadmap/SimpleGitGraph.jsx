import { Gitgraph } from '@gitgraph/react'
import { roadmapFeatures } from './roadmapData'

export function SimpleGitGraph() {
  return (
    <div style={{ padding: '40px', background: 'var(--bgColor-default)', borderRadius: '12px', border: '1px solid var(--borderColor-default)' }}>
      <h3 style={{ marginBottom: '20px', color: 'var(--fgColor-default)' }}>Roadmap Timeline</h3>
      <Gitgraph>
        {(gitgraph) => {
          // Create main branch
          const main = gitgraph.branch("main")
          main.commit("Project start")

          // Create a branch for each roadmap feature
          roadmapFeatures.forEach((feature) => {
            // Create feature branch from current main
            const featureBranch = main.branch(feature.title)

            // Add commit for the feature
            featureBranch.commit(`${feature.status === 'completed' ? '✅' : feature.status === 'in-progress' ? '🚧' : '📋'} ${feature.title}`)

            // Switch back to main and merge
            main.merge(featureBranch)
          })
        }}
      </Gitgraph>
    </div>
  )
}
