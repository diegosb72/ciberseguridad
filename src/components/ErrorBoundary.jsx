import { Component } from 'react'

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error("CRITICAL REACT ERROR:", error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-canvas p-8 text-primary-ink">
          <div className="max-w-md text-center">
            <h1 className="text-2xl font-bold text-ember mb-4">⚠️ Error de carga</h1>
            <p className="mb-4 text-deep-gray">Algo salió mal al cargar la aplicación. Esto suele deberse a una actualización pendiente.</p>
            <pre className="bg-paper p-4 rounded text-left text-xs overflow-auto mb-4 border border-hairline">
              {this.state.error?.toString()}
            </pre>
            <button 
              onClick={() => {
                localStorage.clear()
                window.location.reload(true)
              }}
              className="px-6 py-2 bg-action-blue text-white rounded-full font-medium hover:bg-electric-blue transition-colors"
            >
              Borrar caché y recargar
            </button>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}
