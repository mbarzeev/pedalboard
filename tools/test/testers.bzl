"""Test runner macros for use across packages.

Exports:
  jest_unit_test: a test rule that runs Jest with the project-wide SWC
                  configuration and common base deps.
                  Usage: jest_unit_test(name = "jest", data = [...extra deps])
"""

load("@aspect_rules_jest//jest:defs.bzl", "jest_test")

def jest_unit_test(name, data = [], **kwargs):
    jest_test(
        name = name,
        tags = ["jest"],
        config = "jest.config.js",
        auto_configure_reporters = False,
        args = ["--reporters=default"],
        data = [
            ":sources",
            ":test_sources",
            "jest.config.js",
            "//:jest_config_base",
            "//:node_modules/@swc/core",
            "//:node_modules/@swc/jest",
        ] + data,
        node_modules = ":node_modules",
        **kwargs
    )
