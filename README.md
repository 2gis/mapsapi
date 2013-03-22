DG MAPS API 2.0
====

# node-shortlink [![Build Status](https://travis-ci.org/AndreyChizh/node-shortlink.png?branch=master)](https://travis-ci.org/AndreyChizh/node-shortlink)

Simple generation, encoding and decoding short links library for [Node.js].

[node.js]: http://nodejs.org/

## What?

Short links makes it easier for users to recall and share the locations of important documents and web sites.

This library is used by default Base58 encoding and can represent numeric values with fewer characters and easy understandable view.

## Зависимости

    node.js 
    npm

## Установка окружения

```bash
npm install -g jake
npm install
```

## Консольные команды

### Получить список всех команд

```bash
jake -ls
```

## Проверка исходных JS файлов с помощью [JSHint]

Выполняет проверку всех исходных файлов проекта.

```bash
jake lint
```

В случае ошибки выводит путь к файлу, номер строки, колонки и сообщение.

[JSHint]: http://jshint.com/docs/

## Сборка и минификация

```bash
jake buld
```
