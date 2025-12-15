import { GearIcon, LinkExternalIcon, ArrowLeftIcon } from '@primer/octicons-react'
import { Button, TextInput, Textarea, FormControl, IconButton } from '@primer/react'

export function GitHubAppForm({
  appId,
  setAppId,
  installationId,
  setInstallationId,
  privateKey,
  setPrivateKey,
  appFormError,
  onSubmit,
  onBack,
  onShowGuide
}) {
  return (
    <div style={{
      boxShadow: '0 1px 3px var(--color-shadow-small), 0 8px 24px var(--color-shadow-medium)',
      border: '1px solid var(--borderColor-default)',
      borderRadius: '6px'
    }}>
      <div style={{
        background: 'var(--bgColor-muted)',
        borderBottom: '1px solid var(--borderColor-default)',
        borderRadius: '6px 6px 0 0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '16px 24px'
      }}>
        <IconButton 
          onClick={onBack} 
          size="medium"
          variant="invisible"
          icon={ArrowLeftIcon}
          aria-label="Back"
        />
        <h2 style={{fontSize: '16px', fontWeight: 600, margin: 0, display: 'flex', alignItems: 'center'}}>
          <GearIcon size={20} style={{marginRight: '8px'}} />
          GitHub App Configuration
        </h2>
        <div style={{width: '32px'}}></div> {/* Spacer for alignment */}
      </div>
      <div style={{padding: '32px 40px 16px 40px'}}>
        <p className="f6 mb-4 text-center">
          <button 
            onClick={(e) => { e.preventDefault(); onShowGuide(); }} 
            style={{ 
              background: 'none', 
              border: 'none', 
              padding: 0, 
              cursor: 'pointer', 
              font: 'inherit',
              color: 'var(--fgColor-accent)',
              textDecoration: 'none'
            }}
            onMouseOver={(e) => e.target.style.textDecoration = 'underline'}
            onMouseOut={(e) => e.target.style.textDecoration = 'none'}
          >
            Need help setting up?
            <LinkExternalIcon size={14} style={{display: 'inline', marginLeft: '4px', verticalAlign: 'text-bottom'}} />
          </button>
        </p>
        
        <div style={{marginBottom: '12px'}}>
          <label htmlFor="app-id" className="FormControl-label" style={{display: 'block', marginBottom: '6px', fontWeight: 600, fontSize: '14px'}}>
            App ID
          </label>
          <TextInput
            id="app-id"
            type="text"
            placeholder="123456"
            value={appId}
            onChange={(e) => setAppId(e.target.value)}
            block
            size="large"
          />
        </div>
        
        <div style={{marginBottom: '12px'}}>
          <label htmlFor="installation-id" className="FormControl-label" style={{display: 'block', marginBottom: '6px', fontWeight: 600, fontSize: '14px'}}>
            Installation ID
          </label>
          <TextInput
            id="installation-id"
            type="text"
            placeholder="12345678"
            value={installationId}
            onChange={(e) => setInstallationId(e.target.value)}
            block
            size="large"
          />
        </div>
        
        <div style={{marginBottom: '12px'}}>
          <label htmlFor="private-key" className="FormControl-label" style={{display: 'block', marginBottom: '6px', fontWeight: 600, fontSize: '14px'}}>
            Private Key (PEM)
          </label>
          <Textarea
            id="private-key"
            placeholder="-----BEGIN RSA PRIVATE KEY-----&#10;...&#10;-----END RSA PRIVATE KEY-----"
            value={privateKey}
            onChange={(e) => setPrivateKey(e.target.value)}
            rows={8}
            block
          />
        </div>
        
        {appFormError && (
          <div className="flash flash-error mt-2">
            {appFormError}
          </div>
        )}
        
        <div style={{marginTop: '16px'}}>
          <Button 
            onClick={onSubmit} 
            disabled={!appId || !privateKey || !installationId}
            variant="primary"
            block
            size="large"
            leadingVisual={GearIcon}
          >
            Save & Authenticate
          </Button>
        </div>
        <p className="f6 color-fg-muted mt-3 mb-0 text-center">
          Your credentials are stored locally in your browser.
        </p>
      </div>
    </div>
  )
}
