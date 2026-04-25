"""Test runner macros for use across packages.

Exports:
  vitest_unit_test: a test rule that runs Vitest with the project-wide base
                    configuration and common base deps.
                    Usage: vitest_unit_test(name = "vitest", data = [...extra deps])
"""

load("@npm//:vitest/package_json.bzl", _vitest_bin = "bin")

def vitest_unit_test(name, data = [], **kwargs):
    _vitest_bin.vitest_test(
        name = name,
        tags = ["vitest"],
        chdir = native.package_name(),
        args = ["run", "--reporter=verbose"],
        data = [
            ":sources",
            ":test_sources",
            "vitest.config.mts",
            "//:vitest_config_base",
            ":node_modules/vitest",
            ":node_modules/@vitest/coverage-v8",
        ] + data,
        **kwargs
    )
