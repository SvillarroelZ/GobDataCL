from fastapi import FastAPI


def create_app() -> FastAPI:
    """Create and configure the FastAPI application."""
    app = FastAPI(title="GobData CL API", version="0.1.0")
    # Routers will be included here in later steps
    return app


app = create_app()
