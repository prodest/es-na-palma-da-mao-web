﻿import sourcemaps from 'gulp-sourcemaps';
import uglify from 'gulp-uglify';
import plumber from 'gulp-plumber';
import chmod from 'gulp-chmod';
import _isUndefined from 'lodash/isUndefined';
import _merge from 'lodash/merge';
import debug from 'gulp-debug';

let defaultUglifyOptions = {
    mangle: true
};

class MinifyTask {
    setOptions( options ) {
        this.options = options;

        if ( _isUndefined( this.options.src ) ) {
            throw new Error( 'MinifyTask: src é obrigatório!' );
        }

        if ( _isUndefined( this.options.dest ) ) {
            throw new Error( 'MinifyTask: dest é obrigatório!' );
        }

        this.options.uglifyOptions = _merge( {}, defaultUglifyOptions, this.options.uglifyOptions );

        return this;
    }

    defineTask( gulp ) {
        let options = this.options;

        let taskMetadata = {
            description: 'Minimiza arquivos .js.',
            options: {
                options: {
                    src: 'Source (glob)',
                    dest: 'Destino (glob)',
                    debug: 'Indica se debug está habilitado para a task',
                    uglifyOptions: 'Opções para o plugin gulp-uglify'
                }
            }
        };

        gulp.task( options.taskName, taskMetadata.description, options.taskDeps, () => {
            let chain = gulp.src( options.src )
                            .pipe( plumber() )
                            .pipe( sourcemaps.init( { loadMaps: true } ) )
                            .pipe( uglify( options.uglifyOptions ) )
                            .pipe( sourcemaps.write( '.' ) );

            if ( !_isUndefined( options.chmod ) ) {
                chain = chain.pipe( chmod( options.chmod ) );
            }

            if ( options.debug.active ) {
                chain = chain.pipe( debug( options.debug ) );
            }

            chain = chain.pipe( gulp.dest( options.dest ) );

            return chain;
        }, taskMetadata.options );
    }
}

export default MinifyTask;
