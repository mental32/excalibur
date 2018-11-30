import flask

app = flask.Flask(__name__, static_folder='./assets')
game = flask.Blueprint('game', __name__ + '_game', url_prefix='/game')

@game.route('/<fn>')
def game_root(fn):
    with open('game/%s' % fn) as inf:
        return flask.Response(inf.read(), mimetype='text/javascript')

@app.route('/')
def main():
    with open('index.html') as inf:
        return inf.read()

if __name__ == '__main__':
    app.register_blueprint(game)
    app.run('localhost', 80)
