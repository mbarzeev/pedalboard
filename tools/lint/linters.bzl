"""Linter macros for use across packages.

Exports:
  eslint_test: a test rule that runs ESLint via aspect_rules_lint.
               Usage: eslint_test(name = "lint", srcs = [...])
  stylelint_test: a test rule that runs Stylelint with a per-package config.
               Usage: stylelint_test(name = "stylelint", srcs = [...], config = ":stylelintrc")
"""

load("@aspect_rules_lint//lint:eslint.bzl", "lint_eslint_aspect")
load("@aspect_rules_lint//lint:lint_test.bzl", "lint_test")
load("@npm//:stylelint/package_json.bzl", _stylelint_bin = "bin")

eslint = lint_eslint_aspect(
    binary = Label("//tools/lint:eslint"),
    configs = [
        Label("//:eslintrc"),
    ],
)

_eslint_test = lint_test(aspect = eslint)

def eslint_test(name, srcs, **kwargs):
    _eslint_test(name = name, srcs = srcs, tags = ["lint"], **kwargs)

def stylelint_test(name, srcs, config, data = []):
    _stylelint_bin.stylelint_test(
        name = name,
        tags = ["lint"],
        args = ["--config", "$(location {})".format(config)] +
               ["$(locations {})".format(s) for s in srcs],
        data = srcs + [config] + data,
    )
