/*
Owl Contract Api

Testing IERC1155MetadataURIApiService

*/

// Code generated by OpenAPI Generator (https://openapi-generator.tech);

package openapi

import (
	"context"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
	"testing"
	openapiclient "github.com/GIT_USER_ID/GIT_REPO_ID"
)

func Test_openapi_IERC1155MetadataURIApiService(t *testing.T) {

	configuration := openapiclient.NewConfiguration()
	apiClient := openapiclient.NewAPIClient(configuration)

	t.Run("Test IERC1155MetadataURIApiService InterfacesIERC1155MetadataURIBalanceOf", func(t *testing.T) {

		t.Skip("skip test")  // remove to run test

		var networkId string
		var address string

		resp, httpRes, err := apiClient.IERC1155MetadataURIApi.InterfacesIERC1155MetadataURIBalanceOf(context.Background(), networkId, address).Execute()

		require.Nil(t, err)
		require.NotNil(t, resp)
		assert.Equal(t, 200, httpRes.StatusCode)

	})

	t.Run("Test IERC1155MetadataURIApiService InterfacesIERC1155MetadataURIBalanceOfBatch", func(t *testing.T) {

		t.Skip("skip test")  // remove to run test

		var networkId string
		var address string

		resp, httpRes, err := apiClient.IERC1155MetadataURIApi.InterfacesIERC1155MetadataURIBalanceOfBatch(context.Background(), networkId, address).Execute()

		require.Nil(t, err)
		require.NotNil(t, resp)
		assert.Equal(t, 200, httpRes.StatusCode)

	})

	t.Run("Test IERC1155MetadataURIApiService InterfacesIERC1155MetadataURIIsApprovedForAll", func(t *testing.T) {

		t.Skip("skip test")  // remove to run test

		var networkId string
		var address string

		resp, httpRes, err := apiClient.IERC1155MetadataURIApi.InterfacesIERC1155MetadataURIIsApprovedForAll(context.Background(), networkId, address).Execute()

		require.Nil(t, err)
		require.NotNil(t, resp)
		assert.Equal(t, 200, httpRes.StatusCode)

	})

	t.Run("Test IERC1155MetadataURIApiService InterfacesIERC1155MetadataURISafeBatchTransferFrom", func(t *testing.T) {

		t.Skip("skip test")  // remove to run test

		var networkId string
		var address string

		resp, httpRes, err := apiClient.IERC1155MetadataURIApi.InterfacesIERC1155MetadataURISafeBatchTransferFrom(context.Background(), networkId, address).Execute()

		require.Nil(t, err)
		require.NotNil(t, resp)
		assert.Equal(t, 200, httpRes.StatusCode)

	})

	t.Run("Test IERC1155MetadataURIApiService InterfacesIERC1155MetadataURISafeTransferFrom", func(t *testing.T) {

		t.Skip("skip test")  // remove to run test

		var networkId string
		var address string

		resp, httpRes, err := apiClient.IERC1155MetadataURIApi.InterfacesIERC1155MetadataURISafeTransferFrom(context.Background(), networkId, address).Execute()

		require.Nil(t, err)
		require.NotNil(t, resp)
		assert.Equal(t, 200, httpRes.StatusCode)

	})

	t.Run("Test IERC1155MetadataURIApiService InterfacesIERC1155MetadataURISetApprovalForAll", func(t *testing.T) {

		t.Skip("skip test")  // remove to run test

		var networkId string
		var address string

		resp, httpRes, err := apiClient.IERC1155MetadataURIApi.InterfacesIERC1155MetadataURISetApprovalForAll(context.Background(), networkId, address).Execute()

		require.Nil(t, err)
		require.NotNil(t, resp)
		assert.Equal(t, 200, httpRes.StatusCode)

	})

	t.Run("Test IERC1155MetadataURIApiService InterfacesIERC1155MetadataURISupportsInterface", func(t *testing.T) {

		t.Skip("skip test")  // remove to run test

		var networkId string
		var address string

		resp, httpRes, err := apiClient.IERC1155MetadataURIApi.InterfacesIERC1155MetadataURISupportsInterface(context.Background(), networkId, address).Execute()

		require.Nil(t, err)
		require.NotNil(t, resp)
		assert.Equal(t, 200, httpRes.StatusCode)

	})

	t.Run("Test IERC1155MetadataURIApiService InterfacesIERC1155MetadataURIUri", func(t *testing.T) {

		t.Skip("skip test")  // remove to run test

		var networkId string
		var address string

		resp, httpRes, err := apiClient.IERC1155MetadataURIApi.InterfacesIERC1155MetadataURIUri(context.Background(), networkId, address).Execute()

		require.Nil(t, err)
		require.NotNil(t, resp)
		assert.Equal(t, 200, httpRes.StatusCode)

	})

}