REPOSITORY := oliverbaehler/thesis

# Version
GIT_HEAD_COMMIT ?= $(shell git rev-parse --short HEAD)
VERSION         ?= $(or $(shell git describe --abbrev=0 --tags --match "v*" 2>/dev/null),$(GIT_HEAD_COMMIT))
GO_OS 		    ?= $(shell go env GOOS)
GO_ARCH 	    ?= $(shell go env GOARCH)

# Defaults
GIT_TAG_COMMIT  ?= $(shell git rev-parse --short $(VERSION))
GIT_MODIFIED_1  ?= $(shell git diff $(GIT_HEAD_COMMIT) $(GIT_TAG_COMMIT) --quiet && echo "" || echo ".dev")
GIT_MODIFIED_2  ?= $(shell git diff --quiet && echo "" || echo ".dirty")
GIT_MODIFIED    ?= $(shell echo "$(GIT_MODIFIED_1)$(GIT_MODIFIED_2)")
GIT_REPO        ?= $(shell git config --get remote.origin.url)
BUILD_DATE      ?= $(shell git log -1 --format="%at" | xargs -I{} sh -c 'if [ "$(shell uname)" = "Darwin" ]; then date -r {} +%Y-%m-%dT%H:%M:%S; else date -d @{} +%Y-%m-%dT%H:%M:%S; fi')

build-pack: pack
	$(PACK) build --builder=gcr.io/buildpacks/builder oliverbaehler/thesis:$(GIT_TAG_COMMIT)

github-issue-export:
	@echo "Exporting issues from GitHub"
	@mkdir -p $(DELIVERY)
	@gh issue list --json title,url,labels,created_at,updated_at,author --state all --limit 1000 > $(DELIVERY)/issues.json
	@echo "Issues exported to $(DELIVERY)/issues.json"


PACK = $(shell pwd)/bin/pack
PACK_VERSION = v0.35.1
pack:
	$(call go-install-tool,$(PACK),github.com/buildpacks/pack@$(PACK_VERSION))

# go-install-tool will 'go install' any package $2 and install it to $1.
PROJECT_DIR := $(shell dirname $(abspath $(lastword $(MAKEFILE_LIST))))
define go-install-tool
@[ -f $(1) ] || { \
set -e ;\
GOBIN=$(PROJECT_DIR)/bin go install $(2) ;\
}
endef