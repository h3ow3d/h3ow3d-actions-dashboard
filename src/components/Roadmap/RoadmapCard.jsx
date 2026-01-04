import { useState } from 'react'
import { ChevronDownIcon, ChevronUpIcon, CheckIcon } from '@primer/octicons-react'
import { Label, Text, IconButton } from '@primer/react'
import { statusConfig, priorityConfig } from './roadmapData'
import './RoadmapCard.css'

export function RoadmapCard({ feature, isExpanded, onToggleExpand }) {
  const status = statusConfig[feature.status]
  const priority = priorityConfig[feature.priority]
  const IconComponent = feature.icon

  return (
    <div className={`roadmap-card ${isExpanded ? 'expanded' : ''}`}>
      {/* Card Header */}
      <div className="roadmap-card-header" onClick={onToggleExpand}>
        <div className="card-header-left">
          <div className="feature-icon">
            <IconComponent size={24} />
          </div>
          <div className="feature-title-group">
            <h3 className="feature-title">{feature.title}</h3>
            <p className="feature-category">{feature.category}</p>
          </div>
        </div>
        <div className="card-header-right">
          <div className="badges">
            <Label variant={status.color} size="small">
              {status.icon} {status.label}
            </Label>
            <Label variant={priority.color} size="small">
              {priority.icon} {priority.label}
            </Label>
          </div>
          <IconButton
            icon={isExpanded ? ChevronUpIcon : ChevronDownIcon}
            aria-label={isExpanded ? 'Collapse' : 'Expand'}
            variant="invisible"
            size="small"
          />
        </div>
      </div>

      {/* Card Description (Always Visible) */}
      <div className="roadmap-card-description">
        <Text sx={{ color: 'fg.muted', fontSize: 1 }}>
          {feature.description}
        </Text>
      </div>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="roadmap-card-content">
          {/* Features List */}
          {feature.features && feature.features.length > 0 && (
            <div className="features-list">
              <Text sx={{ fontWeight: 'semibold', fontSize: 1, mb: 2, display: 'block' }}>
                Features:
              </Text>
              <ul className="feature-items">
                {feature.features.map((item, idx) => {
                  // Split on colon to separate title and description
                  const [title, ...descParts] = item.split(':')
                  const desc = descParts.join(':').trim()

                  return (
                    <li key={idx} className="feature-item">
                      <CheckIcon size={16} className="check-icon" />
                      <div>
                        <span className="feature-item-title">{title}</span>
                        {desc && <span className="feature-item-desc">: {desc}</span>}
                      </div>
                    </li>
                  )
                })}
              </ul>
            </div>
          )}

          {/* Use Cases */}
          {feature.useCases && feature.useCases.length > 0 && (
            <div className="use-cases">
              <Text sx={{ fontWeight: 'semibold', fontSize: 1, mb: 2, display: 'block' }}>
                Use Cases:
              </Text>
              <ul className="use-case-list">
                {feature.useCases.map((useCase, idx) => (
                  <li key={idx} className="use-case-item">
                    <span className="bullet">•</span> {useCase}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Note */}
          {feature.note && (
            <div className="feature-note">
              <Label variant="accent" size="small">Note</Label>
              <Text sx={{ fontSize: 1, color: 'fg.muted', mt: 1 }}>
                {feature.note}
              </Text>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
