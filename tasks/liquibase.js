/*
 * grunt-liquibase-sqlite
 * https://github.com/yukoff/grunt-liquibase-sqlite
 *
 * Copyright (c) 2016 Gavriel Fleischer
 * Copyright (c) 2017 Yury Buldakov
 *
 * Licensed under the MIT license.
 */

'use strict';

const path = require('path');
const merge = require('merge');

module.exports = function(grunt) {
  var driver_options = {
    liquibase: {
      options: {
        classpath: path.join(__dirname, '..', 'lib', 'sqlite-jdbc-3.19.3.jar')
      }
    }
  };

  if (grunt.config.data.liquibase.options.classpath) {
    grunt.config.data.liquibase.options.classpath +=
        path.delimiter + driver_options.liquibase.options.classpath;
  }

  if (grunt.config.data.liquibase.driver_options) {
    driver_options.liquibase.options.url =
        `jdbc:sqlite:${grunt.config.data.liquibase.driver_options.database}`;
  }

  grunt.initConfig(merge.recursive(driver_options, grunt.config.data));
  grunt.loadNpmTasks('grunt-liquibase');
};
