DELIVERY := deliverables
REPOSITORY := oliverbaehler/thesis


export-issues:
	export-github-issues --token $${GITHUB_TOKEN} $(REPOSITORY)



github-issue-export:
	@echo "Exporting issues from GitHub"
	@mkdir -p $(DELIVERY)
	@gh issue list --json title,url,labels,created_at,updated_at,author --state all --limit 1000 > $(DELIVERY)/issues.json
	@echo "Issues exported to $(DELIVERY)/issues.json"
