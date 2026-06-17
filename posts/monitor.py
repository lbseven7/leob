import time
import subprocess
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler

class Handler(FileSystemEventHandler):
    def on_modified(self, event):
        if event.src_path.endswith(".md"):
            print(f"\nAlteração detectada em: {event.src_path}. Gerando HTML...")
            subprocess.run(["python", "app.py"])

observer = Observer()
handler = Handler()
observer.schedule(handler, path="posts", recursive=False)
observer.start()

print("Escutador ativo! Monitorando a pasta 'posts'. Pressione Ctrl+C para parar.")

try:
    while True:
        time.sleep(1)
except KeyboardInterrupt:
    observer.stop()
observer.join()