import subprocess
import sys
import os

def install_dependencies():
    """Install required Python dependencies."""
    print("Installing Python dependencies...")
    subprocess.check_call([sys.executable, "-m", "pip", "install", "-r", "backend/requirements.txt"])

def start_backend():
    """Start the FastAPI backend server."""
    print("Starting FastAPI backend server...")
    try:
        # Change to backend directory
        os.chdir("backend")
        
        # Start the FastAPI server
        subprocess.run(["uvicorn", "main:app", "--reload", "--host", "127.0.0.1", "--port", "8000"])
    except FileNotFoundError:
        print("Error: uvicorn not found. Installing dependencies...")
        install_dependencies()
        start_backend()
    except KeyboardInterrupt:
        print("\nBackend server stopped.")

if __name__ == "__main__":
    # Go back to the main directory if we're in backend
    if os.path.basename(os.getcwd()) == "backend":
        os.chdir("..")
    
    install_dependencies()
    start_backend()